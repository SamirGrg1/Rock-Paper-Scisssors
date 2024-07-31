import random
def get_choice():
    player_choice=input("Enter player choice(rock,scissors,paper):")
    option=["rock","paper","scissors"]
    computer_choice=random.choice(option)
    choices={"player_choice":player_choice, "computer_choice":computer_choice}
    return choices
result=get_choice()
print(result)

def check_win(player,computer):
    if player==computer:
        return "tie"
    elif player=="rock":
        if computer=="scissors":
            return "rock smashes scissors,you win"
        else:
            return "paper covers rock,you loose"
    elif player=="scissors":
        if computer=="rock":
            return "rock smashes scissors,you lose"
        else:
            return "scissors cut paper, you win"
    else:
        if computer=="rock":
            return "paper covers rock, you win"
        else:
            return "scissors cut paper, you lost"
        
output=check_win(result["player_choice"],result["computer_choice"])
print(output)
