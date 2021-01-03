module API
  class ProfileSerializer < BaseSerializer
    identifier :id

    fields(:name, :config)
  end
end
