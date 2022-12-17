
const JSON_PATH = "index.json";

class Entity 
{
    constructor(name,imglist,desc)
    {
        this.name = name;
        this.imglist = imglist;
        this.desc = desc;

        this.custom_event_function = this.custom_event_function.bind(this);
    }
    custom_event_function()
    {   
        const event = new Event('CustomEvent');
        event.detail = {'imglist':this.imglist,'desc':this.desc}
        document.dispatchEvent(event);
    }
}

class Data {
  constructor()
  {
      this.entitylist = [];
      this.get_json = this.get_json.bind(this);

      this._render_the_names = this._render_the_names.bind(this);
      this._render_the_images = this._render_the_images.bind(this);
      
      document.addEventListener('CustomEvent',this._render_the_images);
  }

  get_json(json)
  {
      const elist = json;
      for(const item of elist)
      {
          const ent = new Entity(item.entity,item.images,item.Desc);
          this.entitylist.push(ent);
      }
      this._render_the_names();
  }
  get_the_entities()
  {
      fetch(JSON_PATH).then((response)=>response.json()).then(this.get_json);
  }

  _render_the_names()
  {
      const entitycontainer = document.querySelector(".entity");
      for(const ent of this.entitylist)
      {
        const h = document.createElement('h4');
        h.innerHTML = `${ent.name}`;
        h.style.cursor = "pointer";
        entitycontainer.appendChild(h);
          h.addEventListener('click',ent.custom_event_function);
      }
  }

  _render_the_images(event)
    {
        const imagecontainer = document.querySelector(".image_box");
        const descripcontainer = document.querySelector(".description_section");
        imagecontainer.innerHTML = "";
        descripcontainer.innerHTML ="";
        const images = event.detail.imglist;
        const descriptions = event.detail.desc;
        for(const src in images)
        {
            const img = document.createElement("img");

            img.src = images[src];
            img.dataset.descriptor = descriptions[src];
            img.style.cursor="pointer";
            img.addEventListener('click',this._render_the_description)

            const div = document.createElement("div");
            div.classList.add("img_div");
            div.appendChild(img);
            imagecontainer.appendChild(div);
        }
    }
    _render_the_description(event)
    {
        const val = event.currentTarget.dataset.descriptor;   
        const desc_box = document.querySelector(".description_section");
        desc_box.innerHTML = '';
        const p = document.createElement('p');
        p.innerText = val;
        desc_box.appendChild(p);
    }
}


const data = new Data();
data.get_the_entities();