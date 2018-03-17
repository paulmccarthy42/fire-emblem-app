class V1::CharactersController < ApplicationController
  def index
    render json: Character.all.as_json
  end

  def batch_update
    params[:characters].each do |character|
      backend_char = Character.find_by(id: character[:id])
      backend_char.hp = character[:hp] || backend_char.hp
      backend_char.status = character[:status] || backend_char.status
      backend_char.save
    end
    render json: Character.all.as_json
  end
end

