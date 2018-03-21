class V1::TerrainTypesController < ApplicationController
  def generate_map
    map = {}
    20.times do |x|
      map[x] = {}
      20.times do |y|
        map[x][y] = TerrainType.find_by(id: rand(3)+1)
      end
    end
    render json: map
  end
end
