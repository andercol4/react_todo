class BoardsController < ApplicationController
  def index
    @boards = Board.all.order(:created_at)
  end
  def show
    board = Board.find(params[:id])
    render json: board
  end

  def create
    board = Board.create(board_params)
    render json: board
  end

  def update
    board = Board.find(params[:id])
    board.update(board_params)
    render json: board
  end

  def destroy
    Board.find(params[:id]).destroy
    render json: Board.all.order(:created_at)
  end

  private

  def board_params
    params.require(:board).permit(:name)
  end

end
