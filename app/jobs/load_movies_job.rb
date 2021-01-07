class LoadMoviesJob < ApplicationJob
  def perform
    service = Radarr::LoadMovies.new(connection: Connection.radarr)
    service.call
  end
end
