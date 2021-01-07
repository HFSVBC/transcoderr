require "streamio-ffmpeg"

class UpdateMediaMetadata
  def initialize(params)
    @media = params.fetch(:media)
  end

  def call
    @media.update(
      metadata: {
        video_codec: data.video_codec,
        audio_codec: data.audio_codec,
        resolution: data.resolution,
        size: data.size
      }
    )
  end

  private

  def data
    @data ||= FFMPEG::Movie.new(@media.file_location)
  end
end
