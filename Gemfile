source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.7.2"

gem "blueprinter", "~> 0.25.0"
gem "bootsnap", ">= 1.4.2", require: false
gem "faraday"
gem "honeybadger", "~> 4.0"
gem "jbuilder", "~> 2.7"
gem "pagy", "~> 3.7"
gem "puma", "~> 4.3"
gem "rails", "~> 6.1.0"
gem "sass-rails", ">= 6"
gem "sidekiq", "~> 6.1.2"
gem "sidekiq-scheduler", "~> 3.0.1"
gem "sidekiq-status", "~> 1.1.4"
gem "sqlite3", "~> 1.4"
gem "streamio-ffmpeg", "~> 3.0.2"
gem "turbolinks", "~> 5"
gem "webpacker", "~> 4.0"

group :development, :test do
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  gem "dotenv-rails"
  gem "rspec-rails", "~> 4.0.1"
  gem "rubocop", "~> 0.72.0", require: false
  gem "rubocop-performance", require: false
  gem "rubocop-rails", require: false
end

group :development do
  gem "debase", "~> 0.2.4.1"
  gem "listen", "~> 3.2"
  gem "pry", "~> 0.13.1"
  gem "ruby-debug-ide", "~> 0.7.2"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "web-console", ">= 3.3.0"
end

group :test do
  gem "capybara", ">= 2.15"
  gem "selenium-webdriver"
  gem "webdrivers"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[mingw mswin x64_mingw jruby]
