class AutoTranscodeMoviesJob < ApplicationJob
  sidekiq_options retry: 0

  def perform
    service = AutoTranscodeMovies.new(amount: 10)
    service.call
  end
end