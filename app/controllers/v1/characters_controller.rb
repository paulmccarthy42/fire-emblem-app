class V1::CharactersController < ApplicationController
  def index
    render json: Character.all.as_json
  end
end
