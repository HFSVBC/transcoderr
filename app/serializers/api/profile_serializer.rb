module API
  class ProfileSerializer < BaseSerializer
    identifier :id

    fields(:name, :default, :config, :transcoder_config)
  end
end
