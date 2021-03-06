class Movie < ApplicationRecord
  include Trackable

  belongs_to :profile

  validates :name, presence: true
  validates :file_location, presence: true

  scope :h264, -> { where("json_extract(movies.metadata, '$.video_codec') like 'h264'") }

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
      service = Radarr::GetMovie.new(connection: Connection.radarr, movie: self)
      service.call
    end
  end
end
