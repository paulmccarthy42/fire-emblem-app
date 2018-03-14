Rails.application.routes.draw do
  namespace :v1 do
    get "/characters" => "characters#index"
  end
end
