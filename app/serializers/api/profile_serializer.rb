module API
  class ProfileSerializer < BaseSerializer
    identifier :id

    fields(:name, :config, :transcoder_config)
  end
end
