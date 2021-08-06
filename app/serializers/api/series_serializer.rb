module API
  class SeriesSerializer < BaseSerializer
    identifier :id

    fields(
      :name,
      :file_location,
      :profile_id,
      :poster
    )
  end
end
