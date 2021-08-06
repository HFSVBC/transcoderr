module API
  class SerieSerializer < BaseSerializer
    identifier :id

    fields(
      :name,
      :file_location,
      :profile_id,
      :overview,
      :poster,
      :fanart,
    )
  end
end
