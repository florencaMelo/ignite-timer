import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, Separator } from "./styles";

export function Home() {
  return(
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label>Vou trabalhar em</label>
          <input id="task" />

          <label>Durante</label>
          <input type="number" id="minutesAmound" />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <button type="submit">
          <Play size={24}/>
          Começar
        </button>
      </form>
    </HomeContainer>
  )
}