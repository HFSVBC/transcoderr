class Movie < ApplicationRecord
  belongs_to :profile

  validates :name, presence: true
  validates :file_location, presence: true

  def metadata
    read_attribute(:metadata).symbolize_keys
  end

  def overview
    radarr_movie.overview
  end

  def fanart
    radarr_movie.fanart
  end

  private

  def radarr_movie
    @radarr_movie ||= begin
      service = Radarr::GetMovie.new(connection: Connection.radarr.first, movie: self)
      service.call
    end
  end
end
