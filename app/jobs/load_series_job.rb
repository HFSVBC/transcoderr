class LoadSeriesJob < ApplicationJob
  sidekiq_options queue: "low"

  def perform
    service = Sonarr::LoadSeries.new(connection: Connection.sonarr)
    service.call
  end
end
