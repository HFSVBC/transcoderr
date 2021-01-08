class LoadMoviesJob < ApplicationJob
  sidekiq_options queue: "low"

  def perform
    service = Radarr::LoadMovies.new(connection: Connection.radarr)
    service.call
  end
end
