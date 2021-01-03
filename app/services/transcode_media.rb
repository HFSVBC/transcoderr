require "streamio-ffmpeg"

class TranscodeMedia
  def initialize(params)
    @media = params.fetch(:media)
    @profile = params.fetch(:profile)
  end

  def call
    movie = FFMPEG::Movie.new(@media)
    movie.transcode("/media/test.mp4", @profile.config) { |progress| puts progress }
  end
end
