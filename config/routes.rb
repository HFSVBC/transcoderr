Rails.application.routes.draw do
  root to: "pages#application"
  
  get "*path", to: "pages#application" # NOTE This must come in last.
end
