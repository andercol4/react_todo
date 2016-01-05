class ListsController < ApplicationController
  def index
    @items = Item.all
  end
end
