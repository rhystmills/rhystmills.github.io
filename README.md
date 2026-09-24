# rhystmills.github.io

## Running locally

The site is built with Jekyll and requires a standalone Ruby rather than the
version bundled with macOS. Install Ruby 3.3 with Homebrew and add it to your
shell path:

```sh
brew install ruby@3.3
echo 'export PATH="/opt/homebrew/opt/ruby@3.3/bin:/opt/homebrew/lib/ruby/gems/3.3.0/bin:$PATH"' >> ~/.zshrc
exec zsh
gem install bundler
```

Then, from the repository root, install the dependencies and start the local
server:

```sh
cd docs
CPLUS_INCLUDE_PATH="$(xcrun --show-sdk-path)/usr/include/c++/v1" bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000> to view the site. Dependency installation only
needs to be repeated when the `Gemfile` or `Gemfile.lock` changes.
