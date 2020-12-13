class APIController < ActionController::API
  include ConsumerAppHandler
  include Pagy::Backend

  rescue_from APIErrors::StandardError, with: :show_error
  rescue_from APIErrors::UnauthorizedError, with: :not_allowed_401
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_404

  after_action { pagy_headers_merge(@pagy) if @pagy }
end
