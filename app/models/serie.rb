class Serie < ApplicationRecord
  include Trackable

  has_many :serie_episodes

  belongs_to :profile

  validates :name, presence: true
  validates :file_location, presence: true

  def overview
    sonarr_serie.overview
  end

  def fanart
    sonarr_serie.fanart
  end

  private

  def sonarr_serie
    @sonarr_serie ||= begin
      service = Sonarr::GetSerie.new(connection: Connection.sonarr, serie: self)
      service.call
    end
  end
end
