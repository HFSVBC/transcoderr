require "sidekiq"
require "sidekiq-scheduler"
require "sidekiq-status"

Sidekiq.configure_client do |config|
  Sidekiq::Status.configure_client_middleware config, expiration: 30.minutes
end

Sidekiq.configure_server do |config|
  config.on(:startup) do
    Sidekiq.schedule = YAML.load_file(File.expand_path("../sidekiq_scheduler.yml", __dir__))
    SidekiqScheduler::Scheduler.instance.reload_schedule!

    Sidekiq::Status.configure_server_middleware config, expiration: 30.minutes
    Sidekiq::Status.configure_client_middleware config, expiration: 30.minutes
  end
end
