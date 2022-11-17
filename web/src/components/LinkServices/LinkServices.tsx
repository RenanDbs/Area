import { createSignal, createEffect } from "solid-js";
import styles from "./LinkServices.module.scss";
import { RequestApi } from "../../utils/RequestApi";
import ButtonLinkServices from "./ButtonLinkServices";

interface Services {
  name: string;
  _id: string;
}

const LinkServices = () => {
  const [ServicesValue, setServicesValue] = createSignal<[Services]>();

  async function getServices() {
    try {
      const response = await RequestApi("services?projection=name", "get");
      setServicesValue(response.data.services);
    } catch (err) {
      console.log(err);
    }
  }

  createEffect(() => {
    getServices();
  });
  return (
    <div class={styles.Rectangle}>
      <div class={styles.Title}>
        <div>
          <span class={styles.TitleChooseService}>Our services</span>
        </div>
        <div>
          <span class={styles.TitleTrigger}>
            Link your different account to have a global access
          </span>
        </div>
      </div>
      <div class={styles.DivAction}>
        {ServicesValue()?.map((services) => (
          <ButtonLinkServices name={services.name} />
        ))}
      </div>
    </div>
  );
};

export default LinkServices;
