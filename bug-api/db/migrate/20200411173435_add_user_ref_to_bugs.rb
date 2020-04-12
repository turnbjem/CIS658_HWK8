class AddUserRefToBugs < ActiveRecord::Migration[6.0]
  def change
    add_reference :bugs, :user, foreign_key: true
  end
end
