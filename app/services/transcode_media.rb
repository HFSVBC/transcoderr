require "streamio-ffmpeg"

class TranscodeMedia
  def initialize(params)
    @media = params.fetch(:media)
    @job_id = params[:job_id]
  end

  def call
    create_activity
    create_temporary_folder
    transcode { |progress| yield(progress) }
    update_activity
    remove_old_media
    move_new_media
    update_metadata
  end

  private

  def create_activity
    @activity = @media.create_activity(:transcode, old_media: @media.metadata, job_id: @job_id)
  end

  def create_temporary_folder
    dir = File.dirname(tmp_file_location)
    Dir.mkdir(dir) unless File.exists?(dir)
  end

  def transcode
    movie = FFMPEG::Movie.new(@media.file_location)
    movie.transcode(tmp_file_location, @media.profile.config) do |progress|
      yield(progress)
    end
  end

  def update_activity
    @activity.update(finished_at: Time.now)
  end

  def remove_old_media
    File.delete(@media.file_location)
  end

  def move_new_media
    File.rename(tmp_file_location, @media.file_location)
    File.delete(File.dirname(tmp_file_location))
  end

  def update_metadata
    service = UpdateMediaMetadata.new(media: @media)
    service.call
  end

  def tmp_file_location
    @tmp_file_location ||= File.join(dir, %W[tmp #{filename}.mp4])
  end

  def filename
    @filename ||= File.basename(@media.file_location, ".*")
  end

  def dir
    @dir ||= File.dirname(@media.file_location)
  end
end
