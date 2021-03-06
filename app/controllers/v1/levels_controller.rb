class V1::LevelsController < ApplicationController
  def generate_map
    map = {}
    20.times do |x|
      map[x] = {}
      20.times do |y|
        map[x][y] = TerrainType.find_by(id: rand(3)+1)
      end
    end
    render json: map.as_json
  end

  def find_map
    id = params[:id]
    render json: Level.find_by(id: id).as_json
  end
end
