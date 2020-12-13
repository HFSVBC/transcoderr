module ConsumerAppHandler
  def show_error(error)
    render json: error.as_json, status: error.status
  end

  def not_allowed_401(_error)
    show_error(
      APIErrors::UnauthorizedError.new(
        message: "Access denied",
        status: :unauthorized,
      ),
    )
  end

  def not_found_404(_error)
    show_error(
      APIErrors::StandardError.new(
        message: "Resource not found",
        status: :not_found,
      ),
    )
  end
end
