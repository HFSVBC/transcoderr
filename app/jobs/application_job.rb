class ApplicationJob
  include Sidekiq::Worker
  include Sidekiq::Status::Worker
end
