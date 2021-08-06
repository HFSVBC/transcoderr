require "sidekiq/web"
require "sidekiq-scheduler/web"
require "sidekiq-status/web"

Sidekiq::Web.app_url = "/system/tasks"

Sidekiq.configure_client do |config|
  Sidekiq::Status.configure_client_middleware config, expiration: 1.week
end

Sidekiq.configure_server do |config|
  config.on(:startup) do
    Sidekiq.schedule = YAML.load_file(File.expand_path("../sidekiq_scheduler.yml", __dir__))
    SidekiqScheduler::Scheduler.instance.reload_schedule!

    Sidekiq::Status.configure_server_middleware config, expiration: 1.week
    Sidekiq::Status.configure_client_middleware config, expiration: 1.week
  end
end
