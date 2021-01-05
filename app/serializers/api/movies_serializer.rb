module API
  class MoviesSerializer < BaseSerializer
    identifier :id

    fields(
      :name,
      :file_location,
      :profile_id,
      :metadata,
      :poster
    )
  end
end
