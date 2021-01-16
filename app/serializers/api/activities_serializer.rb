module API
  class ActivitiesSerializer < BaseSerializer
    identifier :id

    fields(
      :action,
      :finished_at,
      :metadata,
      :created_at,
    )
  end
end
