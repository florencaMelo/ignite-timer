import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, Separator, CountDownButton, TaskInput, MinutesAmoundInput } from "./styles";

export function Home() {
  return(
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label>Vou trabalhar em</label>
          <TaskInput
           id="task"
           placeholder="Dê um nome para o seu projeto" 
          />

          <label>Durante</label>
          <MinutesAmoundInput 
           type="number"
           id="minutesAmound" 
           placeholder="00"
           />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <CountDownButton disabled type="submit">
          <Play size={24}/>
          Começar
        </CountDownButton>
      </form>
    </HomeContainer>
  )
}