class TranscodeMediaJob < ApplicationJob
  sidekiq_options retry: 0

  def perform(movie_id)
    movie = Movie.find(movie_id)

    service = TranscodeMedia.new(media: movie, job_id: jid)
    service.call do |progress|
      at(progress * 100)
    end
  end
end
