import MainCard from "../layout/MainCard";
import SecondaryCard from "../layout/SecondaryCard";
import TextCard from "../layout/TextCard";
import ActionCard from "../layout/ActionCard";

const Container = ({container, par}) => {
    console.log(container)
    const RenderReturn = () => {
        const {main_card, secondary_card, text_card, action_card} = container
        if (main_card){
            return <MainCard par={par} main_card={main_card} />
        }
        if(secondary_card){
            return <SecondaryCard par={par} secondary_card={secondary_card} />
        }
        if(text_card) {
            return <TextCard text_card={text_card} />
        }
        if(action_card) {
            return <ActionCard action_card={action_card} />
        }
        return null
    }


    return <RenderReturn />
}

export default Container;