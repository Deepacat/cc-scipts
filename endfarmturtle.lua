while true do
    if turtle.detect() then
        print("block found, checking items for 10 seconds")
        for i = 200, 1, -1 do
            if turtle.suck() == true then
                turtle.dropUp()
                print("found item, continuing to take")
                while turtle.suck() == true do
                    turtle.dropUp()
                end
                print("done extracting items")
                break
            end
        end
        print("timed out or finished, digging")
        turtle.dig()
        turtle.dropUp()
    end
    
end