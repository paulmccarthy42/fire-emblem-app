class V1::TerrainTypesController < ApplicationController
  def generate_map
    map = {}
    10.times do |x|
      map[x] = {}
      10.times do |y|
        map[x][y] = TerrainType.find_by(id: rand(2)+1)
      end
    end
    render json: map
  end
end
