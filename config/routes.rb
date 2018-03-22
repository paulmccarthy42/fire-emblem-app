Rails.application.routes.draw do
  namespace :v1 do
    get "/characters" => "characters#index"
    patch "/characters" => "characters#batch_update"
    get "/map" => "levels#generate_map"
  end
end
