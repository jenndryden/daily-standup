class Api::V1::StandupCharactersController < ApplicationController
  def index
    standup_character = StandupCharacter.all.order(created_at: :desc)
    render json: standup_character
  end

  def create
    standup_character = StandupCharacter.create!(standup_character_params)
    if standup_character
      render json: standup_character
    else
      render json: standup_character.errors
    end
  end

  def show
    if standup_character
      render json: standup_character
    else
      render json: standup_character.errors
    end
  end

  def destroy
    standup_character&.destroy
    render json: { message: 'Character deleted!' }
  end

  private

  def standup_character_params
    params.permit(:name, :image, :descriptions, :instruction)
  end

  def standup_character
    @standup_character ||= StandupCharacter.find(params[:id])
  end
end
