module API
  class ConnectionSerializer < BaseSerializer
    identifier :id

    fields(
      :name,
      :provider,
      :host,
      :port,
      :ssl,
    )
  end
end
