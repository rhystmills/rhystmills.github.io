---
layout: post
title:  "Running an ongoing process to watch logs in an EC2 instance"
date:   2023-01-30 16:50:31 +0100
categories: post
summary: "Using an Ubuntu service"
---

After an incident shut down an existing FTP image server at my company, we had to set a new one up at short notice.

As part of this, we needed to move files out of a data directory the instance could access into an s3 bucket where they would be processed.

Our FTP software logged new file transfers to a log. We had previously moved files in a cron job each minute, but found that this created a spike every minute that led to processing delays. It was preferable to react instantly when new files arrive in order to spread out the processing load.

Our server would run on an EC2 instance. EC2 allows us to pass a script as `userData` to be run by the instance on startup.

In our `userData` script, we copied a script to the instance from an s3 bucket where our files were deployed from version control, and made it executable:

```
# Copy a script from our distribution bucket to the /etc directory in the instance

aws s3 cp ${distributionFilesS3Prefix}/etc/tail-script.sh /etc/tail-script.sh

chmod +x /etc/tail-script.sh
```

This script contained a tail process that watched the log and called another script with the final line of that log file, each time a new line was added:

```
#!/bin/bash

set -e

sudo tail -f -n 0 '/var/log/transferredfiles.log' | xargs -L1 sudo bash '/etc/move-to-s3.sh'
```
We needed that script in the instance too, so we also copied that onto the box and made is executable:

```
aws s3 cp ${distributionFilesS3Prefix}/etc/move-to-s3.sh /etc/move-to-s3.sh

chmod +x /etc/move-to-s3.sh
```

We wanted the tail process to run for the duration of the instance. We wanted it to restart if there was an error, and we wouldn’t want it tied to a particular shell. A `service` seemed like a good fit for our requirements, because you can use a service to run a script of your choice and customise what triggers it to run, in what circumstance it should restart, etc.

Our service (`move-to-s3.service`) ended up looking like this:

```
[Unit]
Description=Move to S3 service

[Service]
Type=simple
Restart=always
RestartSec=10
ExecStart=/etc/tail-script.sh
User=root

[Install]
WantedBy=multi-user.target
```

We would need to add this to the instance in the same way that we added the scripts, though it would need to live in a specific directory - `/etc/systemd/system`:

```
aws s3 cp ${distributionFilesS3Prefix}/etc/move-to-s3.service /etc/systemd/system/

# Make sure the service restarts if the instance does:
systemctl enable move-to-s3.service

# Start the service now
systemctl start move-to-s3.service
```

For the sake of completion, our move-to-s3 script looked like the following:

```

#!/bin/bash

set -e

# This script expects to be passed the output of a log line from transferlog. The 9th argument will be the file path

if [ "$9" != "" ]; then

  # The absolute path to the file
  file_location="$9"

  # The user section of the path
  user_path=$(echo "$file_location" | cut -d/ -f3)

  # A file containing the s3 bucket address
  bucket=$(cat /etc/bucket)

  echo "file location is $file_location"
  # Loop through a file containing users we want to sync to s3
  # For users with a different username and destination folder, this will be
  # two colon separated strings, e.g. "joebloggsftp:joebloggs", otherwise a
  # single string

  while read -r group; do
    source_location=$(echo "$group" | cut -d : -f1)
    if [ $user_path == $source_location ]; then
      sync_location=$(echo "$group" | cut -d : -f2)

      if [ -z "$sync_location" ]; then
        sync_location=$source_location
      fi

      if test -f "$file_location"; then
        echo "Syncing $file_location to /$sync_location in S3"
        aws s3 mv $file_location s3://"$bucket"/"${sync_location:?}"
        sudo find /data/"${source_location:?}" -mindepth 1 -depth -mmin +2 -type d -empty -delete
        echo "Successfully synced $source_location to S3"
      fi

    fi

  done &lt; /etc/groups-to-sync-to-s3
fi

```

 

