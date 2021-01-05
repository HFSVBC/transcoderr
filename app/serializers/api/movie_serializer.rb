module API
  class MovieSerializer < BaseSerializer
    identifier :id

    fields(
      :name,
      :file_location,
      :profile_id,
      :overview,
      :metadata,
      :poster,
      :fanart,
    )
  end
end
