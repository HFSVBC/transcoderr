class LoadMoviesJob < ApplicationJob
  sidekiq_options queue: :default

  def perform
    Connection.radarr.find_each do |radarr|
      service = Radarr::LoadMovies.new(connection: radarr)
      service.call
    end
  end
end
