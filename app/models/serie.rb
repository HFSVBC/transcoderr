class Serie < ApplicationRecord
  include Trackable

  belongs_to :profile

  validates :name, presence: true
  validates :file_location, presence: true

  def overview
    sonarr_movie.overview
  end

  def fanart
    sonarr_movie.fanart
  end

  private

  def sonarr_movie
    @sonarr_movie ||= begin
      service = Sonarr::GetSerie.new(connection: Connection.sonarr, serie: self)
      service.call
    end
  end
end
