/**
 * Curated image pool — harvested from the 80 source templates' own (already
 * vetted, live) Unsplash URLs and re-bucketed by category so the same 3–4
 * photos aren't reused across dozens of generated sites.
 *
 * Generated once from the template corpus; hand-edit freely afterwards.
 */

export type ImageCategory =
  | 'tech-abstract'
  | 'office-team'
  | 'infrastructure'
  | 'retail-product'
  | 'luxury-goods'
  | 'workshop-craft'
  | 'datacenter'
  | 'cityscape'
  | 'people-portrait'
  | 'nature-clean';

export interface PoolImage {
  url: string;
  category: ImageCategory;
  tags: string[];
  orientation: 'landscape' | 'portrait' | 'square';
}

export const IMAGE_POOL: PoolImage[] = [
  {
    "url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    "category": "tech-abstract",
    "tags": [
      "tech",
      "hosting"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    "category": "infrastructure",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    "category": "office-team",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    "category": "cityscape",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
    "category": "tech-abstract",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=800&q=80",
    "category": "infrastructure",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    "category": "office-team",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    "category": "cityscape",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
    "category": "tech-abstract",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    "category": "infrastructure",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80",
    "category": "office-team",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    "category": "cityscape",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    "category": "tech-abstract",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    "category": "infrastructure",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    "category": "office-team",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80",
    "category": "cityscape",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=80",
    "category": "tech-abstract",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=1600&q=80",
    "category": "infrastructure",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=1600&q=80",
    "category": "office-team",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
    "category": "cityscape",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    "category": "tech-abstract",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    "category": "infrastructure",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    "category": "office-team",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    "category": "cityscape",
    "tags": [
      "tech",
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=80",
    "category": "tech-abstract",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1600&q=80",
    "category": "infrastructure",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1600&q=80",
    "category": "office-team",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1600&q=80",
    "category": "cityscape",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1600&q=80",
    "category": "tech-abstract",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1600&q=80",
    "category": "infrastructure",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1600&q=80",
    "category": "office-team",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=80",
    "category": "cityscape",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80",
    "category": "tech-abstract",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80",
    "category": "infrastructure",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=80",
    "category": "office-team",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80",
    "category": "cityscape",
    "tags": [
      "tech"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1547996160-71dfa63582b9?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1600&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1606503828362-e6e7683935ec?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1553284965-83fd3e82fa5f?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1580481077194-06901844b207?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1585670149967-b4f4da88cc9f?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1584990347449-307fa9b2f347?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    "category": "people-portrait",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80",
    "category": "retail-product",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    "category": "luxury-goods",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
    "category": "workshop-craft",
    "tags": [
      "retail"
    ],
    "orientation": "landscape"
  },
  {
    "url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    "category": "datacenter",
    "tags": [
      "hosting"
    ],
    "orientation": "landscape"
  }
];

export const AVATARS: string[] = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80"
];

function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

/** Deterministic, no-repeat-within-call picker seeded by `seed`. */
export function pickImages(category: ImageCategory, n: number, seed: string): string[] {
  const pool = IMAGE_POOL.filter((p) => p.category === category);
  const source = pool.length ? pool : IMAGE_POOL;
  if (!source.length) return [];
  const start = hashSeed(seed) % source.length;
  const out: string[] = [];
  for (let i = 0; i < source.length && out.length < n; i++) {
    out.push(source[(start + i) % source.length].url);
  }
  return out;
}

export function pickAvatars(n: number, seed: string): string[] {
  if (!AVATARS.length) return [];
  const start = hashSeed(seed + ':avatar') % AVATARS.length;
  const out: string[] = [];
  for (let i = 0; i < AVATARS.length && out.length < n; i++) {
    out.push(AVATARS[(start + i) % AVATARS.length]);
  }
  return out;
}
