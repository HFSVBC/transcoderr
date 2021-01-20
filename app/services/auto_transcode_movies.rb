class AutoTranscodeMovies
  def initialize(params)
    @amount = params.fetch(:amount, 10)
  end

  def call
    h264_movies = Movie.h264
    offset = rand(h264_movies.count - @amount)

    h264_movies.offset(offset).limit(@amount).find_each do |movie|
      TranscodeMediaJob.perform_async(movie.id)
    end
  end
end
