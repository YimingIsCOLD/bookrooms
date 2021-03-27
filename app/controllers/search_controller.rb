# frozen_string_literal: true

class SearchController < ApplicationController
  respond_to :json

  def create
    render json: Room.available_rooms(search_params).to_json
  end

  private

  def search_params
    params.require(:search).permit(:date, :start_time, :end_time, :seats)
  end
end
