for i = 1, 10 do
  for i = 1, 10 do
    print( "#")
end

while true do
  local event, button, x, y = os.pullEvent( "mouse_click" )
  print( "The mouse button ", button, " was pressed at ", x, " and ", y )
end
